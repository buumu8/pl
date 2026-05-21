USE PTCR;
select
    A.ItemCode as code,
    B.Name2 as name,
    B.Name1 as name2,
    A.UnitCode as unit,
    A.SalePrice1 as AA,
    (
        select
            TOP 1 SalePrice1
        from
            BCPriceList as C
        where
            C.TransportType = 1and C.SaleType = 0
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as AB,
    (
        select
            TOP 1 SalePrice1
        from
            BCPriceList as C
        where
            C.TransportType = 0
            and C.SaleType = 1
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as BA,
    (
        select
            TOP 1 SalePrice1
        from
            BCPriceList as C
        where
            C.TransportType = 1
            and C.SaleType = 1
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as BB,
    A.SalePrice2 as AA2,
    (
        select
            TOP 1 SalePrice2
        from
            BCPriceList as C
        where
            C.TransportType = 1
            and C.SaleType = 0
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as AB2,
    (
        select
            TOP 1 SalePrice2
        from
            BCPriceList as C
        where
            C.TransportType = 0
            and C.SaleType = 1
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as BA2,
    (
        select
            TOP 1 SalePrice2
        from
            BCPriceList as C
        where
            C.TransportType = 1
            and C.SaleType = 1
            and C.FromQty <= 1
            and C.ItemCode = A.ItemCode
            and C.UnitCode = A.unitcode
    ) as BB2,
    B.lastBuyPrice * 1.07 as cost
from
    BCPriceList as A
    INNER JOIN BCITEM as B ON A.ItemCode = B.Code
where
    A.TransportType = 0
    and A.SaleType = 0
    and B.activestatus = 1
    and A.FromQty <= 1
Order by
    Name1;