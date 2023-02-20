export const getDeviceType = (): string => {
  const mobile = 'mobile';
  const desktop = 'desktop';
  const isMobile = window.innerWidth <= 768;
  return isMobile ? mobile : desktop;
};
