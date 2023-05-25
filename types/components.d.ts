interface IAppAccordionInfoItem {
  label: string
  children: IAppAccordionInfoItemChildren[]
}

interface IAppAccordionInfoItemChildren {
  label: string
  value?: string
  slot?: string
}
