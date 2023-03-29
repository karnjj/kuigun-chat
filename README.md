# Kuigun Chat
## Install pnpm

[How to install pnpm](https://pnpm.io/installation)

or simply run

```bash
npm install -g pnpm
```

## Getting started

First, clone this repo using git:

```bash
git clone git@github.com:karnjj/kuigun-chat.git
# or
git clone https://github.com/karnjj/kuigun-chat.git
```

Next, install all dependencies:

```bash
pnpm install
```

Finally, run the development server:

```bash
# run both frontend and backend
pnpm turbo run dev

# run only frontend
pnpm turbo --filter=web dev

# run only backend
pnpm turbo --filter=api dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see frontend.
Open [http://localhost:8000](http://localhost:8000) with your browser to see backend.

Folder structure:

```bash
.
├── apps
│   ├── api # backend
│   └── web # frontend
├── ...
└── README.md
```

To install a new dependency, run:

```bash
# install to root workspace
pnpm add <package-name> --workspace-root

# install to frontend workspace
pnpm --filter=web add <package-name>

# install to backend workspace
pnpm --filter=api add <package-name>
```



