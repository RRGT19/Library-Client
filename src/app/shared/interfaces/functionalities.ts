export interface IPlainViewer {
  plainText();
}

export interface IHtmlViewer {
  htmlText();
}

export interface ICommonViewer extends IPlainViewer, IHtmlViewer {
}
