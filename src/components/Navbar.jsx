import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';


function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const authN = JSON.parse(localStorage.getItem("user"))
    // console.log(authN?.loggedIn)
    let navItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products/#" },
        authN?.loggedIn && localStorage.getItem("role") ? { name: "Cart", path: '/cart' } : null,
        !authN?.loggedIn ? { name: "SignUp", path: "/user/auth" } : null,
        authN?.loggedIn && !localStorage.getItem("role") ? { name: "Admin", path: "/admin" } : null,
        !authN?.loggedIn ? { name: 'Admin', path: "/admin/login" } : null
    ];

    navItems = navItems.filter(i => i !== null)

    function handleLogout(){
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/${localStorage.getItem('role') ? 'user' : 'admin'}/logout`, {}, {withCredentials: true})
        .then(res => {
            // console.log(res)
            toast.success(res.data.message)
            localStorage.removeItem("user")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.message)
        })
    }
    return (
        <motion.section
            initial={{ opacity: 0, y: -35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "200px" }}
            className='backdrop-blur-xl border-b shadow-sm sticky top-0 z-50'
        >
            {/* <nav className="backdrop-blur-xl border-b shadow-sm sticky top-0 z-50"> */}
            <div className="min-w-full mx-auto px-6 py-3 flex justify-between items-center">

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
                                    <Button variant="ghost" asChild>
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
                            <SheetClose asChild>
                                <Button variant="ghost" className="text-red-700" onClick={handleLogout}>Logout</Button>
                            </SheetClose>
                        </nav>

                    </SheetContent>
                </Sheet>


                {/* Desktop */}
                <NavigationMenu className="hidden sm:flex">
                    <NavigationMenuList className="flex gap-3">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.path}>
                                <NavigationMenuLink asChild className="px-3 py-1">
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
                        {authN?.loggedIn && <NavigationMenuItem onClick={handleLogout}>
                            <NavigationMenuLink>
                                <LogOut />
                            </NavigationMenuLink>
                        </NavigationMenuItem>}
                    </NavigationMenuList>
                </NavigationMenu>

            </div>
            {/* </nav> */}
        </motion.section>

    )
}

export default Navbar