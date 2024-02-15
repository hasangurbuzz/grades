import {DirectionType, SortType} from "../client";

type SortTypeItem = {
    key: SortType,
    value: string
}
type DirectionTypeItem = {
    key: DirectionType,
    value: string
}


export const sortTypes: SortTypeItem[] = [
    {
        key: SortType.StudentFirstname,
        value: "Öğrenci Adı"
    },
    {
        key: SortType.StudentLastname,
        value: "Öğrenci Soyadı"
    },
    {
        key: SortType.Point,
        value: "Puan"
    },
    {
        key: SortType.CreatedAt,
        value: "Oluşturulma Tarihi"
    }
]

export const directionTypes: DirectionTypeItem[] = [
    {
        key: DirectionType.Asc,
        value: "Artan"
    },
    {
        key: DirectionType.Desc,
        value: "Azalan"
    }
]

export const formatDate = (dateString: string) => {
    return Intl.DateTimeFormat().format((new Date(dateString)))
}