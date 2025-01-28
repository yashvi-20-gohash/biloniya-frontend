'use client'
import React, { useState, useEffect, useRef } from 'react'
import { AlertModal } from '../../modal/alert-modal'
import { signOut } from 'next-auth/react'
import { CURRENT_BASE_URL } from '@/src/constants'


export const NavbarAdmin = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }



    const closeDropdown = (e: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
        ) {
            setIsDropdownOpen(false)
        }
    }

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', closeDropdown)
        } else {
            document.removeEventListener('click', closeDropdown)
        }

        return () => {
            document.removeEventListener('click', closeDropdown)
        }
    }, [isDropdownOpen])


    const [isModalOpen, setModalOpen] = useState(false)
    const [isItem, setItem] = useState(null)

    const handleConfirmLogeOut = async () => {
        await signOut({ callbackUrl: `${CURRENT_BASE_URL}/signin` })
        setModalOpen(false);
        setItem(null);
    };

    const handleClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center max-w-screen-xl mx-auto px-6 lg:px-0">
                    {/* Right Section */}
                    <div className="flex-1 flex justify-end md:justify-end items-center">
                        <nav className="flex items-center">
                            <div className="hidden md:flex items-center gap-4">
                                {!isItem ? (
                                    <>
                                        <div ref={dropdownRef} className="relative">
                                            <button
                                                onClick={toggleDropdown}
                                                className="mx-2 rounded-md font-normal text-sm text-[#333]"
                                                aria-label="Toggle dropdown"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                    />
                                                </svg>
                                            </button>

                                            {isDropdownOpen && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                                                    <ul className="py-1">
                                                        <li>
                                                            <button
                                                                onClick={() => setModalOpen(true)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Logout
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    null
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <AlertModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onConfirm={handleConfirmLogeOut}
                loading={false}
                variant={'default'}
                title={'Loge Out'}
                description={`Are you sure you want to Loge Out?`}
                confirmText={'Loge Out'}
            />
        </>
    )
}
