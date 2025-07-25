import { ChevronRight, Shield } from "lucide-react";
import Link from "next/link";

export default function DigitalCertificateBanner() {
    return (
    <div className="mb-8 p-6 rounded-lg bg-blue-50 border border-blue-200">
      <div className="flex items-start">
        <Shield className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-medium text-blue-800 mb-2">Digital Certificate Required</h3>
          <p className="text-blue-700 mb-3">
            Institutions without a Digital Certificate can request one through the official GovCA portal.
            This certificate is essential for secure document signing and verification on our platform.
          </p>
          <Link 
            href="https://www.govca.rw/apply/searchIndvdlProductList.sg" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Request Digital Certificate
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
    );
}