require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-wemap-livemap"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/wemap/react-native-wemap-livemap.git", :tag => "#{s.version}" }

  s.vendored_frameworks = 'ios/livemap_ios_sdk.framework'
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }
  

  s.dependency "React"
end
