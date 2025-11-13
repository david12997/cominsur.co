'use client'

import React from 'react';
import { usePathname, useRouter } from 'next/navigation'

const BreadCrumb: React.FC = () => {
    const pathname = usePathname() || '/';
    const router = useRouter();

    // remove empty segments produced by leading/trailing slashes
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = parts.length ? ['Inicio', ...parts] : ['Inicio'];

    const handleClick = (index: number) => {
        if (index === 0) {
            router.push('/');
            return;
        }
        const path = '/' + crumbs.slice(1, index + 1).join('/');
        router.push(path);
    };

    return (
        <section className="flex breadcrumb w-[92vw] ml-[4vw] h-[25px] mt-[60px] p-1 font-medium text-[#6e6e6e] text-[14px]">
            {crumbs.map((item, index) => {
                const label = index === 0 ? 'Inicio' : item.charAt(0).toUpperCase() + item.slice(1);
                return (
                    <span className="cursor-pointer" key={index} onClick={() => handleClick(index)}>
                        {index > 0 && ' > '}
                        {label}
                    </span>
                );
            })}
        </section>
    );
};

export default BreadCrumb;