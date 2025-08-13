import React, { useState, useEffect } from 'react';

interface ProductAnalysisProps {
  copies: any[];
  isLoading: boolean;
}

const ProductAnalysis: React.FC<ProductAnalysisProps> = ({ copies, isLoading }) => {
  // 只在未生成文案时显示
  if (copies.length > 0 || isLoading) {
    return null;
  }

  const [currentPage, setCurrentPage] = useState(0);

  // 所有工具数据
  const allTools = [
    {
      name: "Seller Sprite (卖家精灵)",
      description: "覆盖多维选品视角，挖掘隐藏机会市场",
      url: "https://www.sellersprite.com/",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TPC90ZXh0Pgo8cGF0aCBkPSJNMTggMjJMMjYgMzBMMzQgMjIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "美亚销售榜",
      description: "美国亚马逊销售排行榜",
      url: "https://www.amazon.com/Best-Sellers/zgbs",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8cGF0aCBkPSJNMzggMTJMMzkgMTJMMzkgMTNMMzggMTNaIiBmaWxsPSIjMDA3Q0Y0Ii8+CjxwYXRoIGQ9Ik0zOSAxMkw0MCAxMkw0MCAxM0wzOSAxM1oiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM5IDEzTDQwIDEzTDQwIDE0TDM5IDE0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMzggMTNMMzkgMTNMMzkgMTRMMzggMTRaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-yellow-500 to-orange-500"
    },

    {
      name: "Temu Bestsellers",
      description: "每日更新的Temu最受欢迎榜单",
      url: "https://www.temu.com/",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5URU1VPC90ZXh0Pgo8cGF0aCBkPSJNMjAgMjBIMjJWMjJIMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Google Trends",
      description: "查看关键词搜索量和趋势变化",
      url: "https://trends.google.com/",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM0Mjg1RjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkc8L3RleHQ+CjxwYXRoIGQ9Ik0xOCAyMEgyMlYyNEgxOFoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTIyIDIwSDI2VjI0SDIyWiIgZmlsbD0iI0VBMzQzRCIvPgo8cGF0aCBkPSJNMjYgMjBIMzBWMjRIMjZaIiBmaWxsPSIjRkZCQjAwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgzNFYyNEgzMFoiIGZpbGw9IiM0Q0FGNTAiLz4KPC9zdmc+Cg==",
      color: "from-green-500 to-blue-500"
    },
    {
      name: "英亚销售榜",
      description: "英国亚马逊销售排行榜",
      url: "https://www.amazon.co.uk/Best-Sellers/zgbs",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8cGF0aCBkPSJNMzggMTJMMzkgMTJMMzkgMTNMMzggMTNaIiBmaWxsPSIjMDA3Q0Y0Ii8+CjxwYXRoIGQ9Ik0zOSAxMkw0MCAxMkw0MCAxM0wzOSAxM1oiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM5IDEzTDQwIDEzTDQwIDE0TDM5IDE0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMzggMTNMMzkgMTNMMzkgMTRMMzggMTRaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-blue-600 to-red-600"
    },

    {
      name: "日亚销售榜",
      description: "日本亚马逊销售排行榜（需VPN）",
      url: "https://www.amazon.co.jp/Best-Sellers/zgbs",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8Y2lyY2xlIGN4PSIzOSIgY3k9IjEzIiByPSIxIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-red-500 to-white"
    },
    // 新增更多工具
    {
      name: "美亚飙升榜",
      description: "美国亚马逊飙升排行榜",
      url: "https://www.amazon.com/gp/movers-and-shakers",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8cGF0aCBkPSJNMzggMTJMMzkgMTJMMzkgMTNMMzggMTNaIiBmaWxsPSIjMDA3Q0Y0Ii8+CjxwYXRoIGQ9Ik0zOSAxMkw0MCAxMkw0MCAxM0wzOSAxM1oiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM5IDEzTDQwIDEzTDQwIDE0TDM5IDE0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMzggMTNMMzkgMTNMMzkgMTRMMzggMTRaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-red-500 to-red-600"
    },
    {
      name: "法国销售榜",
      description: "法国亚马逊销售排行榜",
      url: "https://www.amazon.fr/Best-Sellers/zgbs",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8cGF0aCBkPSJNMzggMTJMMzkgMTJMMzkgMTNMMzggMTNaIiBmaWxsPSIjMDA3Q0Y0Ii8+CjxwYXRoIGQ9Ik0zOSAxMkw0MCAxMkw0MCAxM0wzOSAxM1oiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM5IDEzTDQwIDEzTDQwIDE0TDM5IDE0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMzggMTNMMzkgMTNMMzkgMTRMMzggMTRaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-blue-600 to-red-600"
    },
    {
      name: "加拿大销售榜",
      description: "加拿大亚马逊销售排行榜",
      url: "https://www.amazon.ca/Best-Sellers/zgbs",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGNzM0RCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8cGF0aCBkPSJNMzggMTJMMzkgMTJMMzkgMTNMMzggMTNaIiBmaWxsPSIjRkYwMDAwIi8+CjxwYXRoIGQ9Ik0zOSAxMkw0MCAxMkw0MCAxM0wzOSAxM1oiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTM5IDEzTDQwIDEzTDQwIDE0TDM5IDE0WiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMzggMTNMMzkgMTNMMzkgMTRMMzggMTRaIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPgo=",
      color: "from-red-500 to-white"
    },
    {
      name: "Walmart Bestsellers",
      description: "Walmart平台最受欢迎产品列表",
      url: "https://www.walmart.com/browse/top-sellers",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iIzAwNzNGRiIvPgo8cGF0aCBkPSJNMjYgMjBMMjggMjJMMzAgMjBMMzIgMjJMMzQgMjBMMzYgMjJMMzQgMjRMMzIgMjJMMzAgMjRMMjggMjJMMjYgMjRaIiBmaWxsPSIjRkZGRjAwIi8+Cjwvc3ZnPgo=",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "谷歌商机洞察",
      description: "查看全球各国产品类别的具体市场需求",
      url: "https://www.thinkwithgoogle.com/",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM0Mjg1RjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkc8L3RleHQ+CjxwYXRoIGQ9Ik0xOCAyMEgyMlYyNEgxOFoiIGZpbGw9IiM0Mjg1RjQiLz4KPHBhdGggZD0iTTIyIDIwSDI2VjI0SDIyWiIgZmlsbD0iI0VBMzQzRCIvPgo8cGF0aCBkPSJNMjYgMjBIMzBWMjRIMjZaIiBmaWxsPSIjRkZCQjAwIi8+CjxwYXRoIGQ9Ik0zMCAyMEgzNFYyNEgzMFoiIGZpbGw9IiM0Q0FGNTAiLz4KPC9zdmc+Cg==",
      color: "from-purple-500 to-blue-500"
    },
    {
      name: "Most Wished For",
      description: "亚马逊买家愿望清单",
      url: "https://www.amazon.com/gp/registry/wishlist",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8L3N2Zz4K",
      color: "from-pink-500 to-red-500"
    },
    {
      name: "Today's Deals",
      description: "美国亚马逊每日促销",
      url: "https://www.amazon.com/gp/goldbox",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8L3N2Zz4K",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Ebay Daily",
      description: "eBay每日热门商品",
      url: "https://www.ebay.com/trending/",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8dGV4dCB4PSIxMyIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRjAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmU8L3RleHQ+Cjx0ZXh0IHg9IjE5IiB5PSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwNzNGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+YjwvdGV4dD4KPHRleHQgeD0iMjUiIHk9IjMyIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjRkZCQjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5hPC90ZXh0Pgo8dGV4dCB4PSIzMSIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM0Q0FGNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPnk8L3RleHQ+Cjwvc3ZnPgo=",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "GO Indiegogo",
      description: "Indiegogo众筹平台热门项目",
      url: "https://www.indiegogo.com/explore",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIvPgo8dGV4dCB4PSIxMyIgeT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRjAwRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdPPC90ZXh0Pgo8dGV4dCB4PSIyNiIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgZmlsbD0iIzAwMDAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW5kaWVnb2dvPC90ZXh0Pgo8L3N2Zz4K",
      color: "from-pink-500 to-purple-500"
    },
    {
      name: "Kickstarter",
      description: "Kickstarter众筹平台热门项目",
      url: "https://www.kickstarter.com/discover",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUyIiBoZWlnaHQ9IjUyIiByeD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8dGV4dCB4PSIyNiIgeT0iMzIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5LPC90ZXh0Pgo8L3N2Zz4K",
      color: "from-green-500 to-blue-500"
    }
  ];

  // 每页显示4个工具（2行2列）
  const toolsPerPage = 4;
  const totalPages = Math.ceil(allTools.length / toolsPerPage);
  
  // 获取当前页的工具，如果不足8个则用空项填充
  const getCurrentTools = () => {
    const startIndex = currentPage * toolsPerPage;
    const endIndex = startIndex + toolsPerPage;
    const tools = allTools.slice(startIndex, endIndex);
    
    // 如果不足8个，用空项填充到8个
    while (tools.length < toolsPerPage) {
      tools.push(null as any);
    }
    
    return tools;
  };

  const currentTools = getCurrentTools();

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">选品分析</h3>
        </div>
        
        {/* 纵向轮播指示器 */}
        <div className="flex flex-col space-y-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === currentPage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {currentTools.map((tool, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              tool 
                ? 'group cursor-pointer border-gray-200 hover:border-purple-300 hover:shadow-md hover:scale-105' 
                : 'border-transparent'
            }`}
            onClick={tool ? () => window.open(tool.url, '_blank') : undefined}
          >
            {tool ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img 
                    src={tool.icon} 
                    alt={tool.name}
                    className="w-6 h-6 object-cover"
                    onError={(e) => {
                      // 如果图片加载失败，显示文字图标
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-white text-xs font-bold">${tool.name.charAt(0)}</span>`;
                        parent.className = `w-8 h-8 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center flex-shrink-0`;
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                    {tool.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {tool.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-12"></div> // 空白占位
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          点击任意工具即可跳转到对应平台进行选品分析 • 共{allTools.length}个工具，每5秒自动切换
        </p>
      </div>
    </div>
  );
};

export default ProductAnalysis;
