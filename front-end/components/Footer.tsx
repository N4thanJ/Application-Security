import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white py-8 w-full">
            <div className="max-w-5xl px-8 mx-auto flex justify-between items-center w-full">
                <p className="text-sm">&copy; {new Date().getFullYear()} Shoppingcart app</p>
                <nav className="">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/shoppingcarts">Shoppingcarts</Link>
                        </li>
                        <li>
                            <Link href="/itemOverview">Admin overview</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
