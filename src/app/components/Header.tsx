'use client'; // Add this if using client-side features with Next.js App Router

import Image from 'next/image';
import p1 from "../../../public/assets/p1.png";
import Countdown from './Countdown';
import Link from 'next/link';
import { SocialIcon } from "react-social-icons";
import { motion } from 'framer-motion';

const Header = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: '0px 0px 8px rgba(118, 193, 76, 0.5)',
            transition: {
                type: 'spring',
                stiffness: 300,
            },
        },
    };

    const socialVariants = {
        hover: {
            scale: 1.1,
            transition: {
                type: 'spring',
                stiffness: 400,
            },
        },
    };

    const particleVariants = {
        animate: {
            y: [-20, 20],
            transition: {
                y: {
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 4,
                    ease: 'easeInOut',
                },
            },
        },
    };

    return (
        <header
            className="relative flex justify-center items-center bg-cover bg-center min-h-[600px] overflow-hidden"
            style={{
                backgroundImage: `url('/assets/bg22.png')`,
            }}
        >
            {/* Animated overlay */}
            <motion.div
                className="absolute inset-0 bg-[#013983]"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 0.5, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating particles */}
            <motion.div className="absolute inset-0">
                <motion.div
                    className="absolute w-5 h-5 rounded-full bg-white/30 left-[10%] top-[20%]"
                    variants={particleVariants}
                    animate="animate"
                />
                <motion.div
                    className="absolute w-4 h-4 rounded-full bg-white/30 left-[70%] top-[60%]"
                    variants={particleVariants}
                    animate="animate"
                    transition={{ delay: 1 }}
                />
                <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white/30 left-[40%] top-[80%]"
                    variants={particleVariants}
                    animate="animate"
                    transition={{ delay: 2 }}
                />
            </motion.div>

            <motion.div
                className="relative z-10 text-white p-5 lg:p-10 flex flex-col gap-5 justify-between items-center max-w-[1420px]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="container mx-auto lg:text-center flex flex-col gap-3 lg:gap-7 lg:p-36 py-5">
                    <motion.h1
                        className="lg:text-lg text-xs font-bold"
                        variants={itemVariants}
                    >
                        UNLOCK NIGERIA'S PHARMACEUTICAL FRONTIER
                    </motion.h1>
                    <motion.h2
                        className="lg:text-4xl text-xl font-extrabold"
                        variants={itemVariants}
                    >
                        2025 NIGERIA PHARMACEUTICAL INDUSTRY <br />
                        GROWTH AND INVESTMENT SUMMIT
                    </motion.h2>
                    <motion.p
                        className="lg:text-lg text-xs"
                        variants={itemVariants}
                    >
                        The exclusive gathering where pharmaceutical <br />
                        innovation meets capital opportunity
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <Link href="/pages/register" className="flex justify-left lg:justify-center items-center">
                            <motion.button
                                className="bg-[#76C14C] lg:font-bold lg:text-xl lg:px-12 lg:py-3 p-2 rounded-md"
                                variants={buttonVariants}
                                whileHover="hover"
                            >
                                Register now
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="flex lg:justify-center gap-3 lg:items-center"
                        variants={itemVariants}
                    >
                        <motion.div variants={socialVariants} whileHover="hover">
                            <SocialIcon
                                network="linkedin"
                                bgColor="white"
                                fgColor="#0076B2"
                                style={{ width: '24px', height: '24px', borderRadius: '1px' }}
                            />
                        </motion.div>
                        <motion.div variants={socialVariants} whileHover="hover">
                            <SocialIcon
                                network="twitter"
                                bgColor="white"
                                fgColor="#1DA1F2"
                                style={{ width: '24px', height: '24px', borderRadius: '1px' }}
                            />
                        </motion.div>
                        <motion.div variants={socialVariants} whileHover="hover">
                            <SocialIcon
                                network="facebook"
                                bgColor="white"
                                fgColor="#1877F2"
                                style={{ width: '24px', height: '24px', borderRadius: '1px' }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </header>
    );
};

export default Header;