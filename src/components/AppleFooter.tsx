import React from 'react';

export const AppleFooter: React.FC = () => {
  return (
    <footer className="footer text-white pt-10 pb-6 relative z-10" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">猎豹服务</h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                <a
                  href="https://cheetahgo.cmcm.com/classes/facebook/0a4ec1f962875a3c05a4bb915589d5d8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  • Facebook广告
                </a>
              </li>
              <li>
                <a
                  href="https://cheetahgo.cmcm.com/classes/tiktok/f6e08a6462875fbf0440ff297acb257d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  • TikTok广告
                </a>
              </li>
              <li>
                <a
                  href="https://advertiser.cheetahgo.cmcm.com/login/register?s_channel=6rA2Pqzk&source=e1qmXBp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  • 客户自助平台
                </a>
              </li>
              <li>
                <a
                  href="https://overseas.cmcm.com/no9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  • 9号艺术工作室
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">联系我们</h3>
            <ul className="text-gray-300 space-y-2">
              <li>咨询热线: 400-603-7779</li>
              <li>咨询邮箱: adoverseas@cmcm.com</li>
              <li>总部地址: 北京市朝阳区三间房南里7号万东科技文创园11号楼</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">官方公众号</h3>
            <div className="w-32 h-32 mb-3">
              <img
                src="https://7578-ux-new-cms-8gd8ix3g0aa5a108-1252921383.tcb.qcloud.la/cloudbase-cms/upload/2023-03-22/s40ex00l1ikhrlkwx94osckfnwv8bmwp_.png?sign=cca43c2053cdfe248375cc6a08645f52&t=1679467813"
                alt="猎豹国际广告官方公众号二维码"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.classList.remove('hidden');
                  }
                }}
              />
              <div className="hidden w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-1"></div>
                  <div className="text-xs text-gray-600">CMCM</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">关于我们</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              专业的Facebook广告文案生成工具，基于React + Tailwind CSS + DeepSeek构建，
              为广告主提供高质量的文案创作服务。与猎豹移动深度合作，助力企业出海营销。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
