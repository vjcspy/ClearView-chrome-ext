export const chatgptCleaner = () => {
    const style = document.createElement('style');
    style.textContent = `
  .\\[--thread-content-max-width\\:32rem\\] {
    --thread-content-max-width: 60rem !important;
  }
`;
    document.head.appendChild(style);
}