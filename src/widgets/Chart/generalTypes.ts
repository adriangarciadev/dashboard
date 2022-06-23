export type dimensions = {

    height: number;
    width: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft : number;
    boundedWidth:number;
    boundedHeight:number;
    children?:  React.ReactNode;
}
export type accessorPropsType = number | Function;