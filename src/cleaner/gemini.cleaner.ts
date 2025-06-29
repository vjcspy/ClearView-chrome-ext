function setMaxWidthAutoImportantToAllConversationContainers() {
    // 1. Tìm tất cả các phần tử div có class "conversation-container"
    //    document.querySelectorAll trả về một NodeList (tương tự như một mảng) của tất cả các phần tử khớp.
    const conversationContainers = document.querySelectorAll('.conversation-container');

    // 2. Kiểm tra xem có phần tử nào được tìm thấy không
    if (conversationContainers.length > 0) {
        // 3. Lặp qua từng phần tử trong NodeList và áp dụng kiểu
        //    Chúng ta dùng forEach để dễ dàng duyệt qua từng phần tử.
        conversationContainers.forEach(element => {
            // Đặt thuộc tính max-width thành 'auto !important' cho mỗi phần tử
            if(element){
                // @ts-ignore
                element.style.setProperty('max-width', '100%', 'important');
            }
        });
        console.log('Thuộc tính max-width đã được đặt thành auto !important cho TẤT CẢ .conversation-container');
    } else {
        console.log('Không tìm thấy phần tử .conversation-container nào');
    }
}


export const geminiCleaner = () => {
    setMaxWidthAutoImportantToAllConversationContainers();
};