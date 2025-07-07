class apiResponse{
constructor(status, data, message) {
    this.status =status;
    this.message = message||"Success";
    this.data =data;
}
}
export default apiResponse;