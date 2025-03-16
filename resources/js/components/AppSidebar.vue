<script setup>
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/vue3';
import { BookOpen, Folder, LayoutGrid } from 'lucide-vue-next';
import AppLogo from './AppLogo.vue';

const page = usePage(); // Ambil data dari Inertia
const userRole = Number(page.props.auth?.user?.role) || 0; // Konversi ke Number, default 0 untuk guest

const mainNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid, roles: [1, 2, 3] }, // Bisa diakses role 1 & 2
    { title: 'Data Umat', href: '/dataumats', icon: LayoutGrid, roles: [1, 2, 3] }, // Bisa diakses role 1 & 2
    { title: 'Kota', href: '/kotas', icon: LayoutGrid, roles: [2, 3] }, // Hanya role 2
    { title: 'Group', href: '/groups', icon: LayoutGrid, roles: [2, 3] }, // Hanya role 2
    { title: 'Vihara', href: '/viharas', icon: LayoutGrid, roles: [2, 3] }, // Hanya role 2
    { title: 'Pandita', href: '/panditas', icon: LayoutGrid, roles: [2, 3] }, // Hanya role 2
    { title: 'Edit Role', href: '/editroles', icon: LayoutGrid, roles: [2, 3] }, // Hanya role 2
];

// 🔥 Filter menu sesuai role user
const filteredNavItems = mainNavItems.filter((item) => item.roles.includes(userRole));

const footerNavItems = [
    { title: 'Github Repo', href: 'https://github.com/laravel/vue-starter-kit', icon: Folder },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits', icon: BookOpen },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('dashboard')">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="filteredNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
