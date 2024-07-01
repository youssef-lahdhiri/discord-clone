'use client'
import qs from 'query-string';
// import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query'

import { useSocket } from '@/components/providers/socket-provider';

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
}

export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }: ChatQueryProps) => {
    const { isConnected } = useSocket();
    // const params = useParams();
    
    const  fetchMessages=async ({ pageParam}:{pageParam:any})=>  {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        });
        
        const res = await fetch(url);
        return res.json();
    };

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        initialPageParam:undefined,
        queryKey:[queryKey],
        queryFn:fetchMessages,
        getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
        refetchInterval:isConnected?false:1000,
      })
    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
};
