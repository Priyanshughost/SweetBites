import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import BlurText from "@/components/BlurText";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
    const autoplay = useRef(
        Autoplay({
            delay: 2000,   // 2.5 seconds is ideal
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    );
    const [products, setProducts] = useState([])
    function getProducts() {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/getProducts`, {}, {withCredentials:true})
            .then((res) => {
                setProducts(res.data.products)
            })
            .catch(e => {
                toast.error(e.response.data.message || "Failed to load Products")
            })
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "backOut" }}
            >
                <section className="pt-24 pb-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <BlurText
                            text="Baked Fresh. Served Right."
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="w-full flex justify-center text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight"
                        />

                        <BlurText
                            text="Cakes, pastries and desserts crafted with precision. Zero shortcuts. Zero compromise."
                            delay={50}
                            animateBy="words"
                            direction="top"
                            className="w-full flex justify-center text-stone-600 text-lg max-w-2xl mx-auto mt-4 leading-relaxed"
                        />
                        <Link
                            to="/products"
                            className="inline-block mt-8 px-8 py-3 bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-950 transition-all"
                        >
                            Browse Menu
                        </Link>
                    </div>
                </section>
            </motion.div>

            {products.length !== 0 && <motion.section
                initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                viewport={{ once: true, margin: "-200px" }}
            >
                <section className="w-full mx-auto p-6 flex flex-col items-center mt-15">
                    <h1 className="text-3xl font-bold mb-6">Fresh & Delicious Bakery Items</h1>
                    <Carousel
                        plugins={[autoplay.current]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="max-w-full w-full mx-auto py-10"
                    >
                        <CarouselContent>
                            {products.map((product) => (
                                <CarouselItem
                                    key={product?._id}
                                    className="basis-full sm:basis-1/2 lg:basis-1/3"
                                >
                                    {/* <div className="p-2"> */}
                                    <ProductCard product={product} />
                                    {/* </div> */}
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <Button size='lg' asChild>
                        <Link to='/products'>View More</Link>
                    </Button>
                </section>
            </motion.section>
            }
            {/* ABOUT SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "linear" }}
                viewport={{ once: true, margin: "-200px" }}
            >
                <section className="max-w-6xl mx-auto px-6 py-20 mt-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-semibold text-stone-900 mb-4">About Us</h2>
                        <p className="text-stone-600 leading-relaxed text-lg">
                            We create handcrafted cakes and bakery items with precision, quality and
                            a focus on real flavor. No shortcuts, no cheap ingredients. Everything is
                            baked fresh in small batches to preserve taste, texture and aroma.
                        </p>
                    </div>
                </section>
            </motion.div>

            {/* CONTACT / CTA SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: "linear" }}
                viewport={{ once: true, margin: "-200px" }}

            >
                <section className="bg-stone-900 py-16 mt-15">
                    <div className="w-full mx-auto text-center text-white">
                        <h2 className="text-3xl font-semibold mb-4">Want something custom?</h2>
                        <p className="text-stone-300 max-w-2xl mx-auto mb-6">
                            We take orders for birthdays, anniversaries, corporate events and special
                            celebrations. Share your idea — we’ll bake it into reality.
                        </p>

                        <a
                            href="https://wa.me/7549141757" // replace with actual store number
                            target="_blank"
                            className="inline-block px-8 py-3 bg-white text-stone-900 rounded-md text-sm font-medium hover:bg-stone-100 transition"
                        >
                            Contact Us on WhatsApp
                        </a>
                    </div>
                </section>
            </motion.div>

        </>
    );
}

