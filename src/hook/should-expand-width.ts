import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useDeviceWidth = () => {
    const theme = useTheme();

    return {
        isTabletAndPhone: useMediaQuery(theme.breakpoints.down('md')),
    };
};

export default useDeviceWidth;
