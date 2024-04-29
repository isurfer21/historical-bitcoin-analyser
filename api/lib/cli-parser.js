class CliParser {
  static parse(argv) {
    const args = { _: [] };

    argv.forEach((str, index) => {
      if (index >= 2) {
        if (/^[\-\-]{1,2}.+[\=\:].*$/.test(str)) {
          const argParts = str.split(/[\=\:]/),
            argName = argParts[0].substring(argParts[0].lastIndexOf("-") + 1);

          if (argParts[0].lastIndexOf("-") < 2) {
            args[argName] = argParts[1];
          }
        } else if (/^[\-\-]{1,2}.+$/.test(str)) {
          const argName = str.substring(str.lastIndexOf("-") + 1);

          if (str.lastIndexOf("-") < 2) {
            args[argName] = true;
          }
        } else {
          args._.push(str);
        }
      }
    });

    return args;
  }
};

module.exports = CliParser;
