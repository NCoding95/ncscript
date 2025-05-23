import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Award, Star, TrendingUp, Calendar, Crown, Tag } from "lucide-react"

export default function CollectorsCornerPage() {
  // Mock limited edition items
  const limitedEditions = [
    {
      id: "le1",
      name: "2023 Super Treasure Hunt Set",
      description: "Complete set of 15 Super Treasure Hunt vehicles from 2023.",
      price: 15000,
      image: "/images/products/dodge-charger-hellcat-purple.png",
      rarity: "Ultra Rare",
      available: 3,
    },
    {
      id: "le2",
      name: "RLC Exclusive '70 Dodge Charger R/T",
      description: "Red Line Club exclusive with Spectraflame paint and Real Riders wheels.",
      price: 8500,
      image: "/images/products/dodge-charger-srt.png",
      rarity: "RLC Exclusive",
      available: 2,
    },
    {
      id: "le3",
      name: "2022 Convention Exclusive Volkswagen T1 Panel Bus",
      description: "Limited edition from the 2022 Hot Wheels Collectors Convention.",
      price: 12000,
      image: "/images/products/batmobile.png",
      rarity: "Convention Exclusive",
      available: 1,
    },
  ]

  // Updated upcoming releases with the provided images
  const upcomingReleases = [
    {
      id: "ur1",
      name: "Ford GT-40 - Ford Series",
      description: "Limited Edition 1/15,000 - Highly detailed with special wheels & tires and die-cast metal body.",
      releaseDate: "June 15, 2023",
      image: "/images/products/ford-gt40-limited.jpeg",
      series: "Ford Series",
      number: "1/4",
    },
    {
      id: "ur2",
      name: "Rodger Dodger - Gold Edition",
      description: "Classic muscle car with exposed engine and gold finish with racing number 22.",
      releaseDate: "July 5, 2023",
      image: "/images/products/rodger-dodger-gold.jpeg",
      series: "Muscle Mania",
      number: "2/5",
    },
    {
      id: "ur3",
      name: "Limited Grip - Rod Squad",
      description: "Custom pickup truck with exposed engine and yellow wheels. Part of the Rod Squad series.",
      releaseDate: "July 20, 2023",
      image: "/images/products/limited-grip-truck.jpeg",
      series: "Rod Squad",
      number: "3/5",
    },
  ]

  return (
    <div className="bg-hw-dark min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <Crown className="h-8 w-8 text-hw-red mr-3" />
          <h1 className="text-3xl font-racing text-hw-yellow">Collector's Corner</h1>
        </div>

        <div className="bg-gradient-to-b from-hw-darker to-black p-8 rounded-lg border border-hw-border mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-racing text-hw-yellow mb-4">Welcome to the Exclusive Collector's Zone</h2>
            <p className="text-gray-300 mb-6">
              Discover rare treasures, limited editions, and exclusive Hot Wheels cars that are the pride of any
              collection. Our Collector's Corner features hard-to-find items, investment-grade collectibles, and
              upcoming releases that serious collectors won't want to miss.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-black p-3 rounded-lg border border-hw-border">
                <Award className="h-5 w-5 text-hw-red mr-2" />
                <span className="text-white">Limited Editions</span>
              </div>
              <div className="flex items-center bg-black p-3 rounded-lg border border-hw-border">
                <Star className="h-5 w-5 text-hw-yellow mr-2" />
                <span className="text-white">Rare Finds</span>
              </div>
              <div className="flex items-center bg-black p-3 rounded-lg border border-hw-border">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-white">Investment Pieces</span>
              </div>
              <div className="flex items-center bg-black p-3 rounded-lg border border-hw-border">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-white">Upcoming Releases</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-racing text-hw-yellow mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-hw-red" />
            Limited Edition Treasures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {limitedEditions.map((item) => (
              <div key={item.id} className="bg-black rounded-lg border border-hw-border overflow-hidden">
                <div className="relative h-48 bg-gradient-to-b from-hw-darker to-black">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-4" />
                  <div className="absolute top-2 right-2 bg-hw-red text-white text-xs font-bold px-2 py-1 rounded">
                    {item.rarity}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-racing text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-hw-yellow font-bold">₱{item.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">Only {item.available} left</span>
                  </div>
                  <Button className="w-full bg-hw-red hover:bg-hw-orange text-white">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-racing text-hw-yellow mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-hw-red" />
            Upcoming Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingReleases.map((item) => (
              <div key={item.id} className="bg-black rounded-lg border border-hw-border overflow-hidden">
                <div className="relative h-64 bg-gradient-to-b from-hw-darker to-black">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
                  <div className="absolute top-2 right-2 bg-hw-blue text-white text-xs font-bold px-2 py-1 rounded">
                    Coming Soon
                  </div>
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                    {item.series} • {item.number}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-racing text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-hw-yellow mr-1" />
                      <span className="text-gray-400 text-sm">{item.releaseDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 text-hw-red mr-1" />
                      <span className="text-gray-400 text-sm">Pre-order</span>
                    </div>
                  </div>
                  <Button className="w-full bg-hw-blue hover:bg-hw-yellow hover:text-black text-white">
                    Notify Me
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-racing text-hw-yellow mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2 text-hw-red" />
            Collector's Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black rounded-lg border border-hw-border p-6">
              <h3 className="text-lg font-racing text-white mb-4">Hot Wheels Price Guide</h3>
              <p className="text-gray-400 mb-4">
                Access our comprehensive price guide for Hot Wheels collectibles, updated monthly with market values and
                trends.
              </p>
              <Button className="bg-hw-red hover:bg-hw-orange text-white">View Price Guide</Button>
            </div>
            <div className="bg-black rounded-lg border border-hw-border p-6">
              <h3 className="text-lg font-racing text-white mb-4">Collector's Authentication Service</h3>
              <p className="text-gray-400 mb-4">
                Get your valuable Hot Wheels authenticated and graded by our expert team for insurance or resale
                purposes.
              </p>
              <Button className="bg-hw-red hover:bg-hw-orange text-white">Learn More</Button>
            </div>
          </div>
        </section>

        <div className="bg-black p-6 rounded-lg border border-hw-border text-center">
          <h2 className="text-xl font-racing text-hw-yellow mb-4">Join the Collector's Club</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Become a member of our exclusive Collector's Club to get early access to limited editions, special
            discounts, and invitations to collector events in the Philippines.
          </p>
          <Button className="bg-hw-red hover:bg-hw-orange text-white">Join Now</Button>
        </div>
      </div>
    </div>
  )
}
