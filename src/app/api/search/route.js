import { NextResponse } from 'next/server'

const PEXELS_API_KEY = process.env.PEXELS_API_KEY

export async function GET(request) {
    // 添加CORS头
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }

    // 处理OPTIONS请求
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, { status: 200, headers })
    }

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const perPage = searchParams.get('per_page') || '15'
    const page = searchParams.get('page') || '1'

    if (!query) {
        return NextResponse.json(
            { error: 'Query parameter is required' }, 
            { status: 400, headers }
        )
    }

    if (!PEXELS_API_KEY) {
        console.error('PEXELS_API_KEY is not configured')
        return NextResponse.json(
            { error: 'Pexels API key is not configured' }, 
            { status: 500, headers }
        )
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
            const errorText = await response.text()
            console.error(`Pexels API error: ${response.status} - ${errorText}`)
            throw new Error(`Pexels API error: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data, { headers })
    } catch (error) {
        console.error('Error fetching from Pexels API:', error)
        return NextResponse.json(
            { error: 'Failed to fetch images from Pexels', details: error.message },
            { status: 500, headers }
        )
    }
}


export async function OPTIONS(request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
} 