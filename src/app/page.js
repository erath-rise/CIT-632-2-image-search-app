"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, Shuffle, Download, ExternalLink } from 'lucide-react'
import Image from "next/image"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [randomImage, setRandomImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)

  const searchImages = async (query) => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&per_page=20`)
      const data = await response.json()

      if (data.photos) {
        setSearchResults(data.photos)
        setTotalResults(data.total_results)
        // Set random image from results
        if (data.photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.photos.length)
          setRandomImage(data.photos[randomIndex])
        }
      }
    } catch (error) {
      console.error('搜索失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRandomImage = () => {
    if (searchResults.length > 0) {
      const randomIndex = Math.floor(Math.random() * searchResults.length)
      setRandomImage(searchResults[randomIndex])
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    searchImages(searchQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            NAU 图像搜索
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            搜索高质量的免费图像，支持随机查看、下载和查看摄影师主页
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="输入搜索关键词，如：nature, city, food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              搜索
            </Button>
          </div>
        </form>

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            {/* Results Info */}
            <div className="text-center">
              <Badge variant="secondary" className="text-sm">
                找到 {totalResults.toLocaleString()} 张图像
              </Badge>
            </div>

            {/* Tabs for different views */}
            <Tabs defaultValue="random" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="random">随机图像</TabsTrigger>
                <TabsTrigger value="grid">图像网格</TabsTrigger>
              </TabsList>

              {/* Random Image View */}
              <TabsContent value="random" className="space-y-4">
                {randomImage && (
                  <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">随机图像</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              摄影师: {randomImage.photographer}
                            </p>
                          </div>
                          <Button onClick={getRandomImage} variant="outline" size="sm">
                            <Shuffle className="w-4 h-4 mr-2" />
                            换一张
                          </Button>
                        </div>

                        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                          <Image
                            src={randomImage.src.large || "/placeholder.svg"}
                            alt={randomImage.alt || "Random image"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          />
                        </div>

                        <div className="flex gap-2 justify-center">
                          <Button variant="outline" size="sm" asChild>
                            <a href={randomImage.src.original} download target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              下载原图
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={randomImage.photographer_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              摄影师主页
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Grid View */}
              <TabsContent value="grid">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.map((photo) => (
                    <Card key={photo.id} className="group overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative aspect-square">
                          <Image
                            src={photo.src.medium || "/placeholder.svg"}
                            alt={photo.alt || `Photo by ${photo.photographer}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm font-medium truncate">
                              {photo.photographer}
                            </p>
                            <div className="flex gap-1 mt-1">
                              <Button variant="secondary" size="sm" className="h-6 px-2 text-xs" asChild>
                                <a href={photo.src.original} download target="_blank" rel="noopener noreferrer">
                                  <Download className="w-3 h-3" />
                                </a>
                              </Button>
                              <Button variant="secondary" size="sm" className="h-6 px-2 text-xs" asChild>
                                <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Empty State */}
        {!loading && searchResults.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              未找到相关图像
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              尝试使用其他关键词搜索
            </p>
          </div>
        )}

        {/* Initial State */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              开始搜索图像
            </h3>
            <p className="text-slate-500 dark:text-slate-500">
              输入关键词来搜索高质量的免费图像
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
