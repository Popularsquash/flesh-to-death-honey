import { Link } from "wouter";
import { Shield, Lock, CreditCard, Truck, BadgeCheck, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t-8 border-primary">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img src="https://files.manuscdn.com/user_upload_by_module/session_file/104679889/RrSnKdkfcFJysBTv.png" alt="Logo" className="h-10 w-10 object-contain grayscale" />
              <span className="font-heading text-2xl text-white tracking-widest">
                FLESH TO DEATH
              </span>
            </div>
            <p className="text-gray-500 font-body max-w-sm mx-auto md:mx-0">
              Born from beekeeping, tattoos, and the motorcycle lifestyle. A biker apothecary where the road meets the hive. Goods from beeswax is just the beginning...
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-white text-xl mb-6 uppercase">Shop</h4>
            <ul className="space-y-3 font-body text-gray-400">
              <li><a href="/#apparel" className="hover:text-primary transition-colors">Apparel</a></li>
              <li><a href="/#products" className="hover:text-primary transition-colors">Beeswax Products</a></li>
              <li><Link href="/garage" className="hover:text-secondary transition-colors text-secondary">Hives Garage</Link></li>
              <li><a href="https://buzzkillbee-gno4vhs3.manus.space/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">BuzzKill App</a></li>
              <li><Link href="/comics" className="hover:text-primary transition-colors">Comics</Link></li>
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

        {/* Trust Badges Section */}
        <div className="border-t border-gray-800 py-8 mb-8">
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-500 font-body text-sm uppercase tracking-wider">Secure & Trusted Shopping</p>
            
            {/* Trust Badge Icons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {/* SSL Secure Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <Lock className="w-7 h-7 text-green-500" />
                </div>
                <span className="text-xs text-gray-500 font-body">SSL Secure</span>
              </div>

              {/* Stripe Payments Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <CreditCard className="w-7 h-7 text-[#635BFF]" />
                </div>
                <span className="text-xs text-gray-500 font-body">Stripe Payments</span>
              </div>

              {/* Verified Business Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <BadgeCheck className="w-7 h-7 text-blue-500" />
                </div>
                <span className="text-xs text-gray-500 font-body">Verified Business</span>
              </div>

              {/* Secure Checkout Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs text-gray-500 font-body">Secure Checkout</span>
              </div>

              {/* Fast Shipping Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <Truck className="w-7 h-7 text-orange-500" />
                </div>
                <span className="text-xs text-gray-500 font-body">Fast Shipping</span>
              </div>

              {/* Veteran Owned Badge */}
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-gray-900 border-2 border-gray-700 group-hover:border-primary rounded-lg flex items-center justify-center transition-colors">
                  <Star className="w-7 h-7 text-red-500 fill-red-500" />
                </div>
                <span className="text-xs text-gray-500 font-body">Veteran Owned</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <span className="text-xs text-gray-600 font-body">We Accept:</span>
              <div className="flex gap-3">
                {/* Visa */}
                <div className="bg-white rounded px-2 py-1">
                  <svg className="h-5 w-auto" viewBox="0 0 50 16" fill="none">
                    <path d="M19.5 1.5L17 14.5H14L16.5 1.5H19.5Z" fill="#1434CB"/>
                    <path d="M31 1.5L26.5 14.5H23L20.5 4.5C20.3 3.8 20 3.5 19.5 3.2C18.5 2.7 17 2.2 15.5 2L15.6 1.5H21.5C22.3 1.5 23 2 23.2 2.9L24.5 10L28 1.5H31Z" fill="#1434CB"/>
                    <path d="M40 14.5H37L37.5 12.5L36.5 14.5H33.5L35 1.5H38L37 9L40 1.5H43L40 14.5Z" fill="#1434CB"/>
                    <path d="M11 14.5L7 1.5H4L0 14.5H3L3.5 12.5H7.5L8 14.5H11ZM4.5 10L5.5 5L6.5 10H4.5Z" fill="#1434CB"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="bg-white rounded px-2 py-1">
                  <svg className="h-5 w-auto" viewBox="0 0 32 20" fill="none">
                    <circle cx="11" cy="10" r="8" fill="#EB001B"/>
                    <circle cx="21" cy="10" r="8" fill="#F79E1B"/>
                    <path d="M16 4C17.8 5.5 19 7.6 19 10C19 12.4 17.8 14.5 16 16C14.2 14.5 13 12.4 13 10C13 7.6 14.2 5.5 16 4Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* Amex */}
                <div className="bg-[#006FCF] rounded px-2 py-1">
                  <span className="text-white text-xs font-bold">AMEX</span>
                </div>
                {/* Apple Pay */}
                <div className="bg-black border border-gray-700 rounded px-2 py-1">
                  <span className="text-white text-xs font-medium"> Pay</span>
                </div>
                {/* Google Pay */}
                <div className="bg-white rounded px-2 py-1">
                  <span className="text-gray-800 text-xs font-medium">G Pay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-body text-sm">
            © {new Date().getFullYear()} Flesh to Death Honey Co. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com/fleshtodeathhoney" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-primary transition-colors rounded group">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-white text-sm font-medium group-hover:text-black">@fleshtodeathhoney</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
