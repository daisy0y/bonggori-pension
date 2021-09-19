This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Reset Firestore Database

> :warning:**WARNING**
> execution of this command will **reset** your database. If you have important data in the database, do not run this command.

> :warning:**SECURITY ALERT**
> do not upload your `firebase_secret.json` file to git repository. Use it in **local repository only**.

Requirement

1. firebase-admin(node.js firebase module)

```bash
npm install --save-dev firebase-admin
```

2. firebase_secret.json

```
* download secret file from firebase console
(firebase console > project settings > service account > create new service account)

url: https://console.firebase.google.com/project/{your project id}/settings/serviceaccounts/adminsdk

* secret file should be named as firebase_secret.json
* secret file should be placed at the top of the project
```

How to run

```bash
npm run initfs
```

Fore more information, see [resetFirestore.js](resetFirestore.js)

```js
// you can change initial data in this function
async function initializeFireStore() {
    console.log('FireStore initialize result');

    /**
     * collection 이름: userRoles
     * 문서 이름: roleId (Number, auto increment)
     * 필드: {
     *   roleId, roleName
     * }
     * 설명: 유저 역할 (관리자, 일반 유저 등)
     */
    const user_roles_create_result = await init_collection('userRoles', async () => {
        let role_id = (await getLastId('userRoles', 'roleId')) + 1;
        role_id = await create_user_role('ADMIN', role_id);
        sleep(1);
        role_id = await create_user_role('USER', role_id);
        sleep(1);
    });
    console.log(`userRoles: ${user_roles_create_result}`);

    ...
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
