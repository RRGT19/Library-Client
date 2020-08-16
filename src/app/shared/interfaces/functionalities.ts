export interface IPlainViewer {
  plainText(text: string);
}

export interface IHtmlViewer {
  htmlText(text: string);
}

export interface ICommonViewer extends IPlainViewer, IHtmlViewer {
}
