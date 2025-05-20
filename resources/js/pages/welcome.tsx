import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Car, Wrench, Receipt, FileSpreadsheet } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SmartPark Car Repair Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-background p-6 text-foreground lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-border px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/80"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-border/60"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-card border-2 border-border p-6 pb-12 text-[13px] leading-[20px] shadow-sm lg:rounded-tl-lg lg:rounded-br-none lg:p-20">
                            <h1 className="mb-1 text-xl font-bold">SmartPark Garage Rwanda</h1>
                            <p className="mb-4 text-muted-foreground">
                                Car Repair Payment Management System
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                                        </span>
                                    </span>
                                    <span>
                                        Track and manage
                                        <span className="ml-1 inline-flex items-center space-x-1 font-medium text-primary">
                                            car repair services
                                        </span>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-border">
                                    <span className="relative bg-card py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                                        </span>
                                    </span>
                                    <span>
                                        Process payments and generate
                                        <span className="ml-1 inline-flex items-center space-x-1 font-medium text-primary">
                                            detailed reports
                                        </span>
                                    </span>
                                </li>
                            </ul>
                            <div className="flex gap-3 text-sm leading-normal">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded-sm border border-primary bg-primary px-5 py-1.5 text-sm leading-normal text-primary-foreground hover:bg-primary/90"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-primary bg-primary px-5 py-1.5 text-sm leading-normal text-primary-foreground hover:bg-primary/90"
                                    >
                                        Log in to Start
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-accent/20 lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            <div className="flex h-full flex-col items-center justify-center p-6">
                                <div className="mb-8 flex items-center justify-center">
                                    <div className="text-primary">
                                        <Car className="w-16 h-16 mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold text-center">SmartPark</h2>
                                        <p className="text-sm text-center">Rwanda's Premier Auto Service</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                                    <div className="flex flex-col items-center justify-center p-4 bg-card/90 rounded-lg shadow-sm">
                                        <Wrench className="w-8 h-8 text-primary mb-2" />
                                        <span className="text-xs text-center">Quality Repairs</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-card/90 rounded-lg shadow-sm">
                                        <Receipt className="w-8 h-8 text-primary mb-2" />
                                        <span className="text-xs text-center">Payment Tracking</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-card/90 rounded-lg shadow-sm">
                                        <Car className="w-8 h-8 text-primary mb-2" />
                                        <span className="text-xs text-center">Vehicle Management</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-4 bg-card/90 rounded-lg shadow-sm">
                                        <FileSpreadsheet className="w-8 h-8 text-primary mb-2" />
                                        <span className="text-xs text-center">Detailed Reports</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
