import { CacheEntry, CacheConfig } from '../types';

// 缓存管理类
class CopyCache {
  private cache: Map<string, CacheEntry> = new Map();
  private config: CacheConfig = {
    maxEntries: 100, // 最多缓存100个条目
    ttl: 30 * 60 * 1000 // 30分钟过期
  };

  // 生成缓存键
  generateCacheKey(productInfo: any): string {
    const keyData = {
      name: productInfo.name?.trim(),
      features: productInfo.features?.trim(),
      targetAudience: productInfo.targetAudience?.trim(),
      regions: productInfo.regions?.sort().join(','), // 排序确保一致性
      style: productInfo.style,
      tone: productInfo.tone,
      promotion: productInfo.promotion
    };
    
    // 生成简单哈希
    const jsonStr = JSON.stringify(keyData);
    let hash = 0;
    for (let i = 0; i < jsonStr.length; i++) {
      const char = jsonStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 转换为32位整数
    }
    
    return `copy_${Math.abs(hash).toString(36)}`;
  }

  // 获取缓存
  get(key: string): Array<{text: string, region: string, regionName: string}> | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log(`📋 缓存未命中: ${key}`);
      return null;
    }
    
    // 检查是否过期
    if (Date.now() > entry.expiry) {
      console.log(`⏰ 缓存已过期: ${key}`);
      this.cache.delete(key);
      return null;
    }
    
    console.log(`✅ 缓存命中: ${key} (${entry.data.length} 条文案)`);
    return entry.data;
  }

  // 设置缓存
  set(key: string, data: Array<{text: string, region: string, regionName: string}>): void {
    // 如果缓存已满，删除最旧的条目
    if (this.cache.size >= this.config.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
      console.log(`🗑️ 删除最旧缓存: ${oldestKey}`);
    }
    
    const entry: CacheEntry = {
      key,
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.config.ttl
    };
    
    this.cache.set(key, entry);
    console.log(`💾 保存缓存: ${key} (${data.length} 条文案, TTL: ${this.config.ttl/1000/60}分钟)`);
  }

  // 清理过期缓存
  cleanup(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 清理了 ${cleanedCount} 个过期缓存条目`);
    }
  }

  // 获取缓存统计信息
  getStats() {
    return {
      size: this.cache.size,
      maxEntries: this.config.maxEntries,
      ttlMinutes: this.config.ttl / 1000 / 60
    };
  }

  // 清空所有缓存
  clear(): void {
    this.cache.clear();
    console.log('🗑️ 已清空所有缓存');
  }
}

// 导出单例实例
export const copyCache = new CopyCache();

// 定期清理过期缓存(每5分钟)
setInterval(() => {
  copyCache.cleanup();
}, 5 * 60 * 1000);
