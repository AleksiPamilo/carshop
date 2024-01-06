import logger from "@/utils/logger";
import { useEffect, useState } from "react";

export default function useCachedData<T>(
    cacheKey: string,
    fetchUrl: string,
    expiry: number | undefined = 24 * 60 * 60 * 1000
): [T[], unknown | null] {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        if (!cacheKey) {
            logger.error("No cache key provided");
            return;
        }

        const cachedData = sessionStorage.getItem(cacheKey);
        const cacheTimestamp = sessionStorage.getItem(`${cacheKey}Timestamp`);
        const isCacheOld = cacheTimestamp !== null && Date.now() - Number(cacheTimestamp) > expiry;

        if (cachedData !== null && cachedData !== undefined && cachedData !== "undefined" && !isCacheOld) {
            try {
                setData(JSON.parse(cachedData));
            } catch (error) {
                logger.error(`Error parsing cached ${cacheKey}:`, error);
                setData([]);
                setError(error);
            }
        } else {
            if (!fetchUrl) {
                logger.error(`No fetch URL provided for ${cacheKey}`);
                return;
            }

            fetch(fetchUrl)
                .then((res) => res.json())
                .then((json) => {
                    setData(json.data || []);
                    sessionStorage.setItem(cacheKey, JSON.stringify(json.data || []));
                    sessionStorage.setItem(`${cacheKey}Timestamp`, String(Date.now()));
                })
                .catch((error) => {
                    logger.error(`Error fetching ${cacheKey}:`, error);
                    setData([]);
                    setError(error);
                });
        }
    }, [cacheKey, fetchUrl, expiry]);

    return [data, error];
}