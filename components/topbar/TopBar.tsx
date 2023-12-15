

import LanguageSwitcher from "@/components/languageSwitcher/Switch"
import Link from "next/link"
import type {LocalesProps} from "@/types"

const TopBar = ({ locale }: LocalesProps) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 to-gray-900 flex items-center justify-center mx-auto p-3 border-b-2 border-white gap-5 sticky top-0">
      <Link href="/">
        <h1 className="text-white font-bold cursor-pointer">Softenger Test</h1>
      </Link>
      <LanguageSwitcher />
    </div>
  )
}

export default TopBar