# Idle Redirect Browser Extension

A Chrome/Edge browser extension that automatically redirects the current tab to a specified homepage after a period of inactivity.

## Features

- Configurable idle timeout (minimum 15 seconds)
- Customizable homepage URL
- Enable/disable functionality
- Redirects only the current tab (not all tabs)
- Settings persist across browser sessions
- User-friendly settings interface
- Respects browser-specific pages (doesn't redirect chrome:// or edge:// URLs)

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/idle-redirect-extension.git
   ```

2. Open Chrome/Edge and go to the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your browser toolbar to open the settings popup
2. Configure your preferences:
   - Enable/disable the extension
   - Set the idle timeout (minimum 15 seconds)
   - Set your preferred homepage URL
3. Click "Save Settings" to apply your changes

## Settings

- **Enable Idle Redirect**: Toggle the extension on/off
- **Idle Timeout**: Set how long (in seconds) the browser should be idle before redirecting (minimum 15 seconds)
- **Homepage URL**: Set the URL to redirect to when idle

## Development

### Project Structure

```
idle-redirect-extension/
├── manifest.json      # Extension configuration
├── background.js      # Background service worker
├── popup.html         # Settings popup interface
├── popup.js           # Popup interface logic
└── icons/             # Extension icons
    ├── icon16.png     # 16x16 icon
    ├── icon48.png     # 48x48 icon
    └── icon128.png    # 128x128 icon
```

### Building Icons

The extension includes an icon converter tool:
1. Open `icons/convert.html` in your browser
2. The tool will automatically generate the required PNG icons
3. Move the generated icons to the `icons` directory

## Permissions

This extension requires the following permissions:
- `tabs`: To access and update tab information
- `storage`: To save user settings
- `idle`: To detect system idle state

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chrome Extension API documentation
- Edge Extension API documentation