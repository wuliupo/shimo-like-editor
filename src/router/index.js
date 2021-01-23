export default [{
    path: '/desktop',
    name: 'Desktop',
    component: () => import('../views/Desktop.vue'),
}, {
    path: '/docs/:id',
    name: 'Docs',
    component: () => import('../views/Docs.vue'),
    props: true,
}, {
    path: '*',
    redirect: { name: 'Desktop' },
}];
