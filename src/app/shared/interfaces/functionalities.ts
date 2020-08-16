export interface IPlainViewer {
  plainText(keepLineBreaks: boolean);
}

export interface IHtmlViewer {
  htmlText();
}

export interface ICommonViewer extends IPlainViewer, IHtmlViewer {
}
