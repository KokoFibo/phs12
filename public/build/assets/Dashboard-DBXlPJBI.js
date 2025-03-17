import { b as _, m as b, a as e, u as f, o as h, c as i, d as l, r as m, t as n, e as p, w as u, F as x } from './app-A6rt1Zcw.js';
import { _ as g } from './AppLayout.vue_vue_type_script_setup_true_lang-CnEMg3Qw.js';
import './Button.vue_vue_type_script_setup_true_lang-CnFLI-IY.js';
import './index-BewGUgRO.js';
const w = { class: 'max-w-sm rounded-2xl bg-white p-6 shadow-lg' },
    v = { class: 'flex items-center space-x-4' },
    j = { class: 'flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600' },
    k = { class: 'text-lg font-semibold text-gray-700' },
    B = { class: 'text-2xl font-bold text-gray-900' },
    d = {
        __name: 'CardInfo',
        props: { label: String, jumlah: Number },
        setup(s) {
            return (a, t) => (
                h(),
                i('div', w, [
                    e('div', v, [
                        e('div', j, [
                            m(a.$slots, 'icon', {}, () => [
                                t[0] ||
                                    (t[0] = e(
                                        'svg',
                                        {
                                            class: 'h-6 w-6',
                                            xmlns: 'http://www.w3.org/2000/svg',
                                            fill: 'none',
                                            viewBox: '0 0 24 24',
                                            stroke: 'currentColor',
                                        },
                                        [
                                            e('path', {
                                                'stroke-linecap': 'round',
                                                'stroke-linejoin': 'round',
                                                'stroke-width': '2',
                                                d: 'M12 11c3.866 0 7-3.134 7-7S15.866-3 12-3 5 0.134 5 4s3.134 7 7 7zm0 0v7m0 4h.01',
                                            }),
                                        ],
                                        -1,
                                    )),
                            ]),
                        ]),
                        e('div', null, [e('h3', k, n(s.label), 1), e('p', B, n(s.jumlah) + ' Orang', 1)]),
                    ]),
                ])
            );
        },
    },
    I = { class: 'flex h-full flex-1 flex-col gap-4 rounded-xl p-4' },
    C = {
        __name: 'Dashboard',
        props: { totalUmat: Number, umatBulanIni: Number, auth: Object },
        setup(s) {
            var o;
            f();
            const a = _(),
                t = s;
            console.log('pandita_id: ', t.auth.pandita_id),
                a.setUser(((o = t.auth) == null ? void 0 : o.user) || null),
                a.setPanditaIdDefault(t.auth.pandita_id_default),
                a.setViharaIdDefault(t.auth.vihara_id_default),
                a.setPanditaId(t.auth.pandita_id_default),
                a.setViharaId(t.auth.vihara_id_default),
                a.setUserRole(t.auth.user.role);
            const c = [{ title: 'Dashboard', href: '/dashboard' }];
            return (
                console.log('user role : ', t.auth.user.role),
                (D, r) => (
                    h(),
                    i(
                        x,
                        null,
                        [
                            l(p(b), { title: 'Dashboard' }),
                            l(
                                g,
                                { breadcrumbs: c },
                                {
                                    default: u(() => [
                                        e('div', I, [
                                            l(d, { label: 'Umat Baru Bulan Ini', jumlah: s.umatBulanIni }, null, 8, ['jumlah']),
                                            l(
                                                d,
                                                { label: 'Total Umat', jumlah: s.totalUmat },
                                                {
                                                    icon: u(
                                                        () =>
                                                            r[0] ||
                                                            (r[0] = [
                                                                e(
                                                                    'svg',
                                                                    {
                                                                        class: 'h-6 w-6 text-green-600',
                                                                        xmlns: 'http://www.w3.org/2000/svg',
                                                                        fill: 'none',
                                                                        viewBox: '0 0 24 24',
                                                                        stroke: 'currentColor',
                                                                    },
                                                                    [
                                                                        e('path', {
                                                                            'stroke-linecap': 'round',
                                                                            'stroke-linejoin': 'round',
                                                                            'stroke-width': '2',
                                                                            d: 'M16 12 A4 4 0 1 1 8 12 A4 4 0 1 1 16 12z',
                                                                        }),
                                                                    ],
                                                                    -1,
                                                                ),
                                                            ]),
                                                    ),
                                                    _: 1,
                                                },
                                                8,
                                                ['jumlah'],
                                            ),
                                        ]),
                                    ]),
                                    _: 1,
                                },
                            ),
                        ],
                        64,
                    )
                )
            );
        },
    };
export { C as default };
