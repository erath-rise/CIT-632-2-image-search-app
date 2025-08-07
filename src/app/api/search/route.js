import { NextResponse } from 'next/server'

const PEXELS_API_KEY = process.env.PEXELS_API_KEY

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const perPage = searchParams.get('per_page') || '15'
    const page = searchParams.get('page') || '1'

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
    }

    if (!PEXELS_API_KEY) {
        return NextResponse.json({ error: 'Pexels API key is not configured' }, { status: 500 })
    }

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
            {
                headers: {
                    'Authorization': PEXELS_API_KEY,
                },
            }
        )

        if (!response.ok) {
            throw new Error(`Pexels API error: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching from Pexels API:', error)
        return NextResponse.json(
            { error: 'Failed to fetch images from Pexels' },
            { status: 500 }
        )
    }
} 