/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "coq-trotteur-dev.s3.eu-west-3.amazonaws.com",
      "coq-trotteur-prod.s3.eu-west-3.amazonaws.com",
      "coq-trotteur.s3.eu-west-3.amazonaws.com",
      "d3nib4pa45io4l.cloudfront.net",
      "images.unsplash.com",
      "source.unsplash.com",
      "res.cloudinary.com",
      "picsum.photos",
      "coq-trotteur.cellar-c2.services.clever-cloud.com",
    ],
  },
};

module.exports = nextConfig;
