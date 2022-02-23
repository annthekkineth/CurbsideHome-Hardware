const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  ITEM: Symbol("item"),
  INDOOR: Symbol("indoor"),
  OUTDOOR: Symbol("outdoor"),
  SECOND: Symbol("second"),
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sItems = "";
    this.sOrder = "";
    this.nTotal = 0;
    this.nTax = 0;
    this.gTotal = 0;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        aReturn.push("Welcome to Curbside home hardwares.");
        aReturn.push(`For a list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        this.stateCur = OrderState.ITEM;
        aReturn.push("Would you like INDOOR or OUTDOOR items?");
        break;
      case OrderState.ITEM:
        if (sInput.toLowerCase() == "indoor") {
          this.stateCur = OrderState.INDOOR;
          aReturn.push("Which indoor item do you want?");
          aReturn.push("1.Broom 2.Bulb 3.Cleaners ");
        } else if (sInput.toLowerCase() == "outdoor"){
          this.stateCur = OrderState.OUTDOOR;
          aReturn.push("Which outdoor item do you want?");
          aReturn.push("1.Snow shovels 2.Lawn care 3.Snow clearing");
        }
        else {
          this.stateCur = OrderState.ITEM;
        aReturn.push("Enter a valid choice: INDOOR or OUTDOOR ?");
        }
        break;
      case OrderState.INDOOR:
       
        if (sInput.toLowerCase() == "broom") {
          this.sOrder += sInput + ", ";
          this.nTotal += 6;
        } else if (sInput.toLowerCase() == "bulb") {
          this.sOrder += sInput + ", ";
          this.nTotal += 3;
        } else if (sInput.toLowerCase() == "cleaners") {
          this.sOrder += sInput + ", ";
          this.nTotal += 8;
        } else {
          aReturn.push(
            "Please mention the valid item: 1.Broom 2.Bulb 3.Cleaners "
          );
          this.stateCur = OrderState.INDOOR;
          break;
        }
        this.stateCur = OrderState.SECOND;
        aReturn.push("Would you like to order another item?");
        break;
      case OrderState.OUTDOOR:
        
        if (sInput.toLowerCase() == "snow shovels") {
          this.sOrder += sInput + ", ";
          this.nTotal += 10;
        } else if (sInput.toLowerCase() == "lawn care") {
          this.sOrder += sInput + ", ";
          this.nTotal += 15;
        } else if (sInput.toLowerCase() == "snow clearing") {
          this.sOrder += sInput + ", ";
          this.nTotal += 100;
        } else {
          aReturn.push(
            "Please mention the valid item: 1.Snow shovels 2.Lawn care 3.Snow clearing");
          this.stateCur = OrderState.OUTDOOR;
          break;
        }
        this.stateCur = OrderState.SECOND;
        aReturn.push("Would you like to order another item?");
        break;
      case OrderState.SECOND:
        if (sInput.toLowerCase() == "no") {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push(
            "Would you like to order any of the following items? If yes, mention the item"
          );
          aReturn.push(
            "1.Simoniz car cloth 2.Geeky headlamps 3.Descalar kettle"
          );
        } else {
          aReturn.push("Would you like Indoor or Outdoor items?");
          this.stateCur = OrderState.ITEM;
        }
        break;

      case OrderState.EXTRAS:
        if (sInput.toLowerCase() != "no") {
          if (sInput.toLowerCase() == "simoniz car cloth") {
            this.sOrder += sInput + ", ";
            this.nTotal += 10;
          } else if (sInput.toLowerCase() == "geeky headlamps") {
            this.sOrder += sInput + ", ";
            this.nTotal += 38;
          } else if (sInput.toLowerCase() == "descalar kettle") {
            this.sOrder += sInput + ", ";
            this.nTotal += 17.5;
          } else {
            aReturn.push("Invalid item!");
            break;
          }
        }
        aReturn.push("Thank-you for your order of");
        aReturn.push(this.sOrder);
        this.nTax = this.nTotal * 0.03;
        this.gTotal = this.nTotal + this.nTax;
        aReturn.push(`Total: ${this.nTotal}, Tax: ${this.nTax}`);

        aReturn.push(`Your grand total comes to ${this.gTotal}`);
        aReturn.push(
          `We will text you from 519-222-2222 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
      <html>
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="content-type" />
    <style type="text/css">
      ol {
        margin: 0;
        padding: 0;
      }
      table td,
      table th {
        padding: 0;
      }
      .c3 {
        border-right-style: solid;
        padding: 5pt 5pt 5pt 5pt;
        border-bottom-color: #000000;
        border-top-width: 1pt;
        border-right-width: 1pt;
        border-left-color: #000000;
        vertical-align: top;
        border-right-color: #000000;
        border-left-width: 1pt;
        border-top-style: solid;
        border-left-style: solid;
        border-bottom-width: 1pt;
        width: 234pt;
        border-top-color: #000000;
        border-bottom-style: solid;
      }
      .c2 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
        height: 11pt;
      }
      .c1 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 11pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c6 {
        color: #000000;
        font-weight: 400;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 16pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c10 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .c11 {
        color: #000000;
        text-decoration: none;
        vertical-align: baseline;
        font-size: 24pt;
        font-family: "Arial";
        font-style: normal;
      }
      .c12 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1.15;
        orphans: 2;
        widows: 2;
        text-align: center;
      }
      .c0 {
        padding-top: 0pt;
        padding-bottom: 0pt;
        line-height: 1;
        text-align: left;
      }
      .c13 {
        border-spacing: 0;
        border-collapse: collapse;
        margin-right: auto;
      }
      .c4 {
        background-color: #ffffff;
        font-size: 30pt;
        font-weight: 700;
      }
      .c9 {
        background-color: #ffffff;
        max-width: 468pt;
        padding: 72pt 72pt 72pt 72pt;
      }
      .c8 {
        font-weight: 700;
      }
      .c5 {
        height: 0pt;
      }
      .c7 {
        font-size: 16pt;
      }
      .title {
        padding-top: 0pt;
        color: #000000;
        font-size: 26pt;
        padding-bottom: 3pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      .subtitle {
        padding-top: 0pt;
        color: #666666;
        font-size: 15pt;
        padding-bottom: 16pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      li {
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      p {
        margin: 0;
        color: #000000;
        font-size: 11pt;
        font-family: "Arial";
      }
      h1 {
        padding-top: 20pt;
        color: #000000;
        font-size: 20pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h2 {
        padding-top: 18pt;
        color: #000000;
        font-size: 16pt;
        padding-bottom: 6pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h3 {
        padding-top: 16pt;
        color: #434343;
        font-size: 14pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h4 {
        padding-top: 14pt;
        color: #666666;
        font-size: 12pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h5 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
      h6 {
        padding-top: 12pt;
        color: #666666;
        font-size: 11pt;
        padding-bottom: 4pt;
        font-family: "Arial";
        line-height: 1.15;
        page-break-after: avoid;
        font-style: italic;
        orphans: 2;
        widows: 2;
        text-align: left;
      }
    </style>
  </head>
  <body class="c9">
    <p class="c12"><span class="c8 c11">Curbside Home hardware</span></p>
    <p class="c2"><span class="c1"></span></p>
    <p class="c10"><span class="c6">For curbside pickup:</span></p>
    <p class="c10">
      <span class="c7">Send a message to </span><span class="c4">519-111-1111</span><span class="c1">&nbsp;</span>
    </p>
    <p class="c2"><span class="c1"></span></p>
    <p class="c2"><span class="c1"></span></p>
    <a id="t.8d77dfb49bdc9584f64e2193880c175d7a6fbaa3"></a><a id="t.0"></a>
    <table class="c13">
      <tbody>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Broom + Dustbin</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$6</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Light bulbs</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$3</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Household cleaners</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$8</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Snow shovels</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$10</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Lawn care</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$15</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Snow clearing</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$100</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Simoniz car cloth</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$10</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Geeky headlamps</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$38</span></p>
          </td>
        </tr>
        <tr class="c5">
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">Descaler for kettle</span></p>
          </td>
          <td class="c3" colspan="1" rowspan="1">
            <p class="c0"><span class="c6">$17.50</span></p>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="c2"><span class="c1"></span></p>
  </body>
</html>
`;
  }
};
