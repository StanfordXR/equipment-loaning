'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Children } from '../types'
import Link from 'next/link'
import { CalendarPlus, Package, ScanBarcode } from 'lucide-react'
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation'
import SignOutButton from '../sign-out-button'

interface SidebarItem {
    href: string;
    label: string;
    icon: ReactNode;
}

export default function AdminSidebar({ children }: Children) {
    const sidebarItems: SidebarItem[] = [
        {
            href: '/admin/inventory',
            label: 'Inventory',
            icon: <Package />
        },
        {
            href: '/admin/periods',
            label: 'Periods',
            icon: <CalendarPlus />
        },
        {
            href: '/admin/checkout',
            label: 'Checkout',
            icon: <ScanBarcode />
        }
    ];

    const pathname = usePathname();

    return (
        <SidebarProvider>
            <Sidebar collapsible='none' className='pt-4 h-screen'>
                <SidebarContent className='px-4'>
                    <SidebarHeader>StanfordXR Equipment Loaning Admin</SidebarHeader>
                    <SidebarMenu>
                        {sidebarItems.map(({ href, label, icon }) =>
                            <SidebarMenuItem key={href}>
                                <SidebarMenuButton asChild isActive={pathname.startsWith(href)}>
                                    <Link href={href}>
                                        {icon}
                                        {label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className='pb-4'>
                    <SignOutButton />
                </SidebarFooter>
            </Sidebar>
            <div className='px-4 w-full'>
                {children}
            </div>
        </SidebarProvider>
    )
}