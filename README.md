This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## DownLoad

- 方法一

```
git clone --recursive git@github.com:huing/next-app.git
```

- 方法二

```
git clone git@github.com:huing/next-app.git
git submodule init
git submodule update
```

### blog 用法

#### start the hugo server

```
cd blog
hugo server -D
```

#### build static pages

```
cd blog
hugo -D
```

#### publish

```
cd blog/public
git push
```
