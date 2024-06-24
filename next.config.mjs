/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["note-keeper.s3.eu-north-1.amazonaws.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/audio/",
          publicPath: "/_next/static/audio/",
        },
      },
    });

    return config;
  },
};

export default nextConfig;