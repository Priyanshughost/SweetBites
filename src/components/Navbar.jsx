import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';


function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Cart", path: "/cart" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: -35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "200px" }}
            className='backdrop-blur-xl border-b shadow-sm sticky top-0 z-50'
        >
            {/* <nav className="backdrop-blur-xl border-b shadow-sm sticky top-0 z-50"> */}
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

                <Link to="/" className="text-2xl font-extrabold tracking-tight text-stone-900">
                    SweetBites
                </Link>

                {/* Mobile */}
                <Sheet>
                    <SheetTrigger asChild className="sm:hidden">
                        <Button variant="icon"><Menu /></Button>
                    </SheetTrigger>

                    <SheetContent side="top">
                        <SheetHeader>
                            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
                            <SheetDescription className="text-sm text-stone-600">
                                Browse site pages
                            </SheetDescription>
                        </SheetHeader>

                        <nav className="flex flex-col gap-4 pb-6">
                            {navItems.map((item) => (
                                <SheetClose asChild key={item.path}>
                                    <Button variant="outline" asChild>
                                        <Link
                                            to={item.path}
                                            className={`transition-colors text-lg font-medium ${location.pathname === item.path
                                                ? "text-stone-900 font-semibold"
                                                : "text-stone-600 hover:text-stone-900"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </Button>
                                </SheetClose>
                            ))}
                        </nav>

                    </SheetContent>
                </Sheet>


                {/* Desktop */}
                <NavigationMenu className="hidden sm:flex">
                    <NavigationMenuList className="flex gap-3">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.path}>
                                <NavigationMenuLink asChild className="px-3 py-1 rounded-md">
                                    <Link
                                        to={item.path}
                                        className={`transition-colors text-lg font-medium ${location.pathname === item.path
                                                ? "text-stone-900 font-semibold"
                                                : "text-stone-600 hover:text-stone-900"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
            {/* </nav> */}
        </motion.section>

    )
}

export default Navbar