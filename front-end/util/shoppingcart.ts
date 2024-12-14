export const formatDate = (date: any) => {
    const validDate = new Date(date);

    const year = validDate.getFullYear();
    const month = (validDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = validDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
