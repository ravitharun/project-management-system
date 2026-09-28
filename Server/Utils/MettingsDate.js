
const CurrDate = new Date().toISOString().split("T")[0]
const Todays_mettings = (FetchMettings) => FetchMettings.filter((mettings) => mettings.MettingDate == CurrDate)
const Upcoming_mettings = (FetchMettings) => FetchMettings.filter((mettings) => mettings.MettingCompleted ? "" : mettings.MettingDate > CurrDate)
const Mettings_ = (FetchMettings) => FetchMettings.filter((mettings) => mettings.MettingCompleted == true)
module.exports = { Todays_mettings, Upcoming_mettings, Mettings_ }