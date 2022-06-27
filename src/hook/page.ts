import { useRouter } from 'next/router';
import { parseAsNumber } from 'parse-dont-validate';

const usePage = () => {
    const router = useRouter();
    const { query } = router;

    return {
        page: parseAsNumber(
            parseInt(typeof query.page === 'string' ? query.page : '1')
        )
            .inRangeOf(1, Number.MAX_SAFE_INTEGER)
            .orElseLazyGet(() => 1),
    };
};

export default usePage;
