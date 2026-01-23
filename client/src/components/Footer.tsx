import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-8 border-primary">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img src="/images/hero-bee.png" alt="Logo" className="h-10 w-10 object-contain grayscale" />
              <span className="font-heading text-2xl text-white tracking-widest">
                FLESH TO DEATH
              </span>
            </div>
            <p className="text-gray-500 font-body max-w-sm mx-auto md:mx-0">
              Small scale motorcycle lifestyle brand focusing on apparel and beeswax products for the younger generation alpha and Z.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-white text-xl mb-6 uppercase">Shop</h4>
            <ul className="space-y-3 font-body text-gray-400">
              <li><a href="/#apparel" className="hover:text-primary transition-colors">Apparel</a></li>
              <li><a href="/#products" className="hover:text-primary transition-colors">Beeswax Products</a></li>
              <li><a href="https://buzzkillbee-gno4vhs3.manus.space/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">BuzzKill App</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-white text-xl mb-6 uppercase">Legal</h4>
            <ul className="space-y-3 font-body text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">No Snitches Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-body text-sm">
            © {new Date().getFullYear()} Flesh to Death Honey Co. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 bg-gray-800 hover:bg-primary transition-colors cursor-pointer"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
