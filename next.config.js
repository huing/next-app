/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * todo
   * 配置了ts才能掉通/api/*
   * 跟文件读取有关系吧
   * */
  pageExtensions: ["ts", "tsx", "jsx"],
  // images: {
  //   domains: ['example.com', 'example2.com'],
  // },
};

module.exports = nextConfig;
