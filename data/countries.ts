export type Region =
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Middle East"
  | "Africa"
  | "Oceania"

export type CountryRecord = {
  country: string
  nationality: string
  phoneCode: string
  isoCode: string
  region: Region
  flagEmoji: string
}

type RawCountryRecord = Omit<CountryRecord, "flagEmoji">

function toFlagEmoji(isoCode: string): string {
  return isoCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("")
}

const rawCountryData: RawCountryRecord[] = [
  { country: "Afghanistan", nationality: "Afghan", phoneCode: "+93", isoCode: "AF", region: "Asia" },
  { country: "Albania", nationality: "Albanian", phoneCode: "+355", isoCode: "AL", region: "Europe" },
  { country: "Algeria", nationality: "Algerian", phoneCode: "+213", isoCode: "DZ", region: "Africa" },
  { country: "Argentina", nationality: "Argentine", phoneCode: "+54", isoCode: "AR", region: "South America" },
  { country: "Armenia", nationality: "Armenian", phoneCode: "+374", isoCode: "AM", region: "Asia" },
  { country: "Australia", nationality: "Australian", phoneCode: "+61", isoCode: "AU", region: "Oceania" },
  { country: "Austria", nationality: "Austrian", phoneCode: "+43", isoCode: "AT", region: "Europe" },
  { country: "Azerbaijan", nationality: "Azerbaijani", phoneCode: "+994", isoCode: "AZ", region: "Asia" },
  { country: "Bangladesh", nationality: "Bangladeshi", phoneCode: "+880", isoCode: "BD", region: "Asia" },
  { country: "Belarus", nationality: "Belarusian", phoneCode: "+375", isoCode: "BY", region: "Europe" },
  { country: "Belgium", nationality: "Belgian", phoneCode: "+32", isoCode: "BE", region: "Europe" },
  { country: "Bhutan", nationality: "Bhutanese", phoneCode: "+975", isoCode: "BT", region: "Asia" },
  { country: "Brazil", nationality: "Brazilian", phoneCode: "+55", isoCode: "BR", region: "South America" },
  { country: "Brunei", nationality: "Bruneian", phoneCode: "+673", isoCode: "BN", region: "Asia" },
  { country: "Bulgaria", nationality: "Bulgarian", phoneCode: "+359", isoCode: "BG", region: "Europe" },
  { country: "Cambodia", nationality: "Cambodian", phoneCode: "+855", isoCode: "KH", region: "Asia" },
  { country: "Canada", nationality: "Canadian", phoneCode: "+1", isoCode: "CA", region: "North America" },
  { country: "Chile", nationality: "Chilean", phoneCode: "+56", isoCode: "CL", region: "South America" },
  { country: "China", nationality: "Chinese", phoneCode: "+86", isoCode: "CN", region: "Asia" },
  { country: "Colombia", nationality: "Colombian", phoneCode: "+57", isoCode: "CO", region: "South America" },
  { country: "Croatia", nationality: "Croatian", phoneCode: "+385", isoCode: "HR", region: "Europe" },
  { country: "Czech Republic", nationality: "Czech", phoneCode: "+420", isoCode: "CZ", region: "Europe" },
  { country: "Denmark", nationality: "Danish", phoneCode: "+45", isoCode: "DK", region: "Europe" },
  { country: "Egypt", nationality: "Egyptian", phoneCode: "+20", isoCode: "EG", region: "Africa" },
  { country: "Finland", nationality: "Finnish", phoneCode: "+358", isoCode: "FI", region: "Europe" },
  { country: "France", nationality: "French", phoneCode: "+33", isoCode: "FR", region: "Europe" },
  { country: "Georgia", nationality: "Georgian", phoneCode: "+995", isoCode: "GE", region: "Asia" },
  { country: "Germany", nationality: "German", phoneCode: "+49", isoCode: "DE", region: "Europe" },
  { country: "Ghana", nationality: "Ghanaian", phoneCode: "+233", isoCode: "GH", region: "Africa" },
  { country: "Greece", nationality: "Greek", phoneCode: "+30", isoCode: "GR", region: "Europe" },
  { country: "Hong Kong", nationality: "Hong Konger", phoneCode: "+852", isoCode: "HK", region: "Asia" },
  { country: "Hungary", nationality: "Hungarian", phoneCode: "+36", isoCode: "HU", region: "Europe" },
  { country: "India", nationality: "Indian", phoneCode: "+91", isoCode: "IN", region: "Asia" },
  { country: "Indonesia", nationality: "Indonesian", phoneCode: "+62", isoCode: "ID", region: "Asia" },
  { country: "Iran", nationality: "Iranian", phoneCode: "+98", isoCode: "IR", region: "Middle East" },
  { country: "Iraq", nationality: "Iraqi", phoneCode: "+964", isoCode: "IQ", region: "Middle East" },
  { country: "Ireland", nationality: "Irish", phoneCode: "+353", isoCode: "IE", region: "Europe" },
  { country: "Israel", nationality: "Israeli", phoneCode: "+972", isoCode: "IL", region: "Middle East" },
  { country: "Italy", nationality: "Italian", phoneCode: "+39", isoCode: "IT", region: "Europe" },
  { country: "Japan", nationality: "Japanese", phoneCode: "+81", isoCode: "JP", region: "Asia" },
  { country: "Jordan", nationality: "Jordanian", phoneCode: "+962", isoCode: "JO", region: "Middle East" },
  { country: "Kazakhstan", nationality: "Kazakh", phoneCode: "+7", isoCode: "KZ", region: "Asia" },
  { country: "Kenya", nationality: "Kenyan", phoneCode: "+254", isoCode: "KE", region: "Africa" },
  { country: "Kuwait", nationality: "Kuwaiti", phoneCode: "+965", isoCode: "KW", region: "Middle East" },
  { country: "Kyrgyzstan", nationality: "Kyrgyz", phoneCode: "+996", isoCode: "KG", region: "Asia" },
  { country: "Laos", nationality: "Lao", phoneCode: "+856", isoCode: "LA", region: "Asia" },
  { country: "Latvia", nationality: "Latvian", phoneCode: "+371", isoCode: "LV", region: "Europe" },
  { country: "Lithuania", nationality: "Lithuanian", phoneCode: "+370", isoCode: "LT", region: "Europe" },
  { country: "Luxembourg", nationality: "Luxembourgish", phoneCode: "+352", isoCode: "LU", region: "Europe" },
  { country: "Malaysia", nationality: "Malaysian", phoneCode: "+60", isoCode: "MY", region: "Asia" },
  { country: "Maldives", nationality: "Maldivian", phoneCode: "+960", isoCode: "MV", region: "Asia" },
  { country: "Mexico", nationality: "Mexican", phoneCode: "+52", isoCode: "MX", region: "North America" },
  { country: "Mongolia", nationality: "Mongolian", phoneCode: "+976", isoCode: "MN", region: "Asia" },
  { country: "Myanmar", nationality: "Burmese", phoneCode: "+95", isoCode: "MM", region: "Asia" },
  { country: "Nepal", nationality: "Nepalese", phoneCode: "+977", isoCode: "NP", region: "Asia" },
  { country: "Netherlands", nationality: "Dutch", phoneCode: "+31", isoCode: "NL", region: "Europe" },
  { country: "New Zealand", nationality: "New Zealander", phoneCode: "+64", isoCode: "NZ", region: "Oceania" },
  { country: "Nigeria", nationality: "Nigerian", phoneCode: "+234", isoCode: "NG", region: "Africa" },
  { country: "Norway", nationality: "Norwegian", phoneCode: "+47", isoCode: "NO", region: "Europe" },
  { country: "Pakistan", nationality: "Pakistani", phoneCode: "+92", isoCode: "PK", region: "Asia" },
  { country: "Peru", nationality: "Peruvian", phoneCode: "+51", isoCode: "PE", region: "South America" },
  { country: "Philippines", nationality: "Filipino", phoneCode: "+63", isoCode: "PH", region: "Asia" },
  { country: "Poland", nationality: "Polish", phoneCode: "+48", isoCode: "PL", region: "Europe" },
  { country: "Portugal", nationality: "Portuguese", phoneCode: "+351", isoCode: "PT", region: "Europe" },
  { country: "Qatar", nationality: "Qatari", phoneCode: "+974", isoCode: "QA", region: "Middle East" },
  { country: "Romania", nationality: "Romanian", phoneCode: "+40", isoCode: "RO", region: "Europe" },
  { country: "Russia", nationality: "Russian", phoneCode: "+7", isoCode: "RU", region: "Europe" },
  { country: "Saudi Arabia", nationality: "Saudi", phoneCode: "+966", isoCode: "SA", region: "Middle East" },
  { country: "Serbia", nationality: "Serbian", phoneCode: "+381", isoCode: "RS", region: "Europe" },
  { country: "Singapore", nationality: "Singaporean", phoneCode: "+65", isoCode: "SG", region: "Asia" },
  { country: "Slovakia", nationality: "Slovak", phoneCode: "+421", isoCode: "SK", region: "Europe" },
  { country: "Slovenia", nationality: "Slovenian", phoneCode: "+386", isoCode: "SI", region: "Europe" },
  { country: "South Africa", nationality: "South African", phoneCode: "+27", isoCode: "ZA", region: "Africa" },
  { country: "South Korea", nationality: "Korean", phoneCode: "+82", isoCode: "KR", region: "Asia" },
  { country: "Spain", nationality: "Spanish", phoneCode: "+34", isoCode: "ES", region: "Europe" },
  { country: "Sri Lanka", nationality: "Sri Lankan", phoneCode: "+94", isoCode: "LK", region: "Asia" },
  { country: "Sweden", nationality: "Swedish", phoneCode: "+46", isoCode: "SE", region: "Europe" },
  { country: "Switzerland", nationality: "Swiss", phoneCode: "+41", isoCode: "CH", region: "Europe" },
  { country: "Taiwan", nationality: "Taiwanese", phoneCode: "+886", isoCode: "TW", region: "Asia" },
  { country: "Thailand", nationality: "Thai", phoneCode: "+66", isoCode: "TH", region: "Asia" },
  { country: "Turkey", nationality: "Turkish", phoneCode: "+90", isoCode: "TR", region: "Middle East" },
  { country: "Ukraine", nationality: "Ukrainian", phoneCode: "+380", isoCode: "UA", region: "Europe" },
  { country: "United Arab Emirates", nationality: "Emirati", phoneCode: "+971", isoCode: "AE", region: "Middle East" },
  { country: "United Kingdom", nationality: "British", phoneCode: "+44", isoCode: "GB", region: "Europe" },
  { country: "United States", nationality: "American", phoneCode: "+1", isoCode: "US", region: "North America" },
  { country: "Uzbekistan", nationality: "Uzbek", phoneCode: "+998", isoCode: "UZ", region: "Asia" },
  { country: "Vietnam", nationality: "Vietnamese", phoneCode: "+84", isoCode: "VN", region: "Asia" },
]

export const countryData: CountryRecord[] = rawCountryData.map((item) => ({
  ...item,
  flagEmoji: toFlagEmoji(item.isoCode),
}))
