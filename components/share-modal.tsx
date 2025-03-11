// components/share-modal.tsx
'use client';

import { FiLink, FiFacebook, FiTwitter, FiLinkedin, FiX, FiInstagram } from 'react-icons/fi';
import { useState } from 'react';

export const ShareModal = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-end md:items-center justify-center transition-all">
      <div 
        className="w-full md:w-xl bg-white rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-xl transform transition-all duration-300"
        style={{ transform: show ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-900">Share This Campaign</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
            >
              <FiX size={24} className="md:w-7 md:h-7" />
            </button>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center justify-around gap-4 mb-6">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full md:w-6/10 p-3 md:p-4 border-2 border-blue-100 rounded-xl text-base md:text-lg"
              />
              <button
                onClick={copyToClipboard}
                className="w-full md:w-auto bg-blue-100 text-blue-900 px-4 md:px-6 py-3 md:py-4 rounded-xl hover:bg-blue-200 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg"
              >
                <FiLink className="shrink-0" />
                {isCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg md:text-xl text-blue-900 font-semibold">Share via Social Media</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 md:gap-3 transition-colors"
                >
                  <FiFacebook className="w-5 h-5 md:w-6 md:h-6" />
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-400 text-white p-3 md:p-4 rounded-xl hover:bg-blue-500 flex items-center justify-center gap-2 md:gap-3 transition-colors"
                >
                  <FiTwitter className="w-5 h-5 md:w-6 md:h-6" />
                  Twitter
                </a>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-700 text-white p-3 md:p-4 rounded-xl hover:bg-blue-800 flex items-center justify-center gap-2 md:gap-3 transition-colors"
                >
                  <FiLinkedin className="w-5 h-5 md:w-6 md:h-6" />
                  LinkedIn
                </a>
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-pink-600 text-white p-3 md:p-4 rounded-xl hover:bg-pink-700 flex items-center justify-center gap-2 md:gap-3 transition-colors"
                >
                  <FiInstagram className="w-5 h-5 md:w-6 md:h-6" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};