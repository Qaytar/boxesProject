/**
 * useDeviceType.js
 * 
 * Custom hook with two constants to have 'graceful degradation' in mobile users
 */

const useDeviceType = () => {
    const isDesktopOS = window.navigator.userAgent.match(/(Windows|Win|Mac|PC|Linux)/i);
    const isScreenWidthValid = window.innerWidth >= 1000;
    const isDesktop = isDesktopOS && isScreenWidthValid;

    return { isDesktop };
};

export default useDeviceType;
