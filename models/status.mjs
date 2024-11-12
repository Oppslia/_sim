export const Status = (function() {
    const Status = {}
    Status[Status["DEAD"] = 0] = "DEAD"
    Status[Status["EDGE_OF_DEATH"] = 1] = "EDGE_OF_DEATH"
    Status[Status["FAIR"] = 2] = "FAIR"
    Status[Status["HEALTHY"] = 3] = "HEALTHY"
    Status[Status["GOD_HOOD_ACHIEVED"] = 4] = "GOD_HOOD_ACHIEVED"
    return Status
}())